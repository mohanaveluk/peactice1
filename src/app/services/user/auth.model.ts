export interface LoginResponse{
  status?: string;
  message?: string;
  result?: LoginModelResponse;
}

export interface LoginModelResponse{
  id: number;
  org_id: number;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  roleid: number;
  profile_picture_url: string;
  createdon: string;
  updatedon: string;
  updatedby: number;
  token: string;
}
