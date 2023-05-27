export default interface Delta {
  _id?: string;
  ops: [
    {
      insert: any; 
      attributes?: any;
    }
  ];
}