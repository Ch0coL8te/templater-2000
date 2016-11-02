const fs = require('fs');
const {BrowserWindow, shell, dialog} = require('electron');

exports.handlePrintEvent = (event, companyShortName) => {
    let win = BrowserWindow.fromWebContents(event.sender);

    return new Promise((resolve, reject) => {
        // Use default printing options
        win.webContents.printToPDF({}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    }).then(data => {
        let pdfPath = dialog.showSaveDialog(win, {
            defaultPath: `${companyShortName}.pdf`, // companyShortName + '.pdf'
            filters: [
                {name: 'PDF document', extensions: ['pdf']}
            ]
        });

        if (pdfPath != null) {
            fs.writeFile(pdfPath, data, error => {
                if (error) throw error;
                shell.openExternal('file://' + pdfPath);
            });
        }
    }).catch(err => {
        dialog.showMessageBox(win, {
            type: 'error',
            title: 'Не удалось сохранить документ',
            message: err.message,
            buttons: ['OK']
        });
    });
};
