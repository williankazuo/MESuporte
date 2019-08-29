/**
 * Model para ser utilizada nos previews das imagens
 */
export class PreviewFileModel {

    name: string | ArrayBuffer;

    constructor(name: string | ArrayBuffer) {
        this.name = name;
    }
}

/**
 * Model para ser utilizada na formação da lista de imagens que serão enviadas ao backend
 */
export class FileModel {

    file: File;

    constructor(file: File) {
        this.file = file;
    }
}