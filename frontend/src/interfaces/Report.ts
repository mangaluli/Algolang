export default interface Report {
  _id?: string;
  entity_type: string;
  entity_id: string;

  date:string;

  reporter_user_id: string;
  text:string;
}