import School from "./School";

export default interface DashboardInfos {
  exp: number;
  schools: Array<School>;
  user_id: number;
}
