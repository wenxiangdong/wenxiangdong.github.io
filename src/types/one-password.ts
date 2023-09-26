export interface SocialType {
  id: string;
  name: string;
  account: string;
}
export interface SecretType {
  id: string;
  // main info
  name: string;
  account: string;
  password: string;
  
  // extra info
  phone: string;  // 某些账号绑定了手机
  // socialList: SocialType[];   // 绑定了某些社交账号

  // data info
  createAt: number;

}