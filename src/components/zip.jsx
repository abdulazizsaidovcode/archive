import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Papkani zip ko'rinishida yuklab olish funksiyasi
export const handleDownloadFolder = (folder) => {
    const zip = new JSZip();

    const addFilesToZip = (currentFolder, zipInstance) => {
        // Fayl yoki papkalarni zip ichiga joylashtiramiz
        if (currentFolder.children) {
            const folderZip = zipInstance.folder(currentFolder.name); // Papka yaratamiz
            currentFolder.children.forEach(child => {
                addFilesToZip(child, folderZip); // Rekursiya bilan ichma-ich papkalarni joylaymiz
            });
        } else {
            zipInstance.file(currentFolder.name, 'Fake content'); // Fayl uchun mazmun (real ma'lumotlarni yuklaysiz)
        }
    };

    addFilesToZip(folder, zip);

    zip.generateAsync({ type: "blob" })
        .then(function (blob) {
            saveAs(blob, `${folder.name}.zip`);
        });
};
