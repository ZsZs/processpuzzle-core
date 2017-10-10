export class SmartDocument {
   id: number;
   template = `<h1>Loaded dynamically!</h1>`;

   // constructors
   constructor(template: string) {
      this.template = template;
   }

   // public accessors and mutators
   public updateContent(content: string) {

   }
}
