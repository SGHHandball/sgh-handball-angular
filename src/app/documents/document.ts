export class Document {
  id: string;
  name: string;
  files: DocumentFile[] = [];
  documents: Document[] = [];


  constructor(name: string) {
    this.name = name;
  }
}

export class DocumentFile {
  name: string;
  url: string;


  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
