import './extend'
export interface Verify {
  
  check(flag?:boolean): Verify;
  error(a:any): Verify;
  test(value:any): Verify;
  or(): Verify;
  end(a?:any): Verify;
  
}

export interface VerifyConstructor<V extends Verify = Verify> {
  new(options?: any): Verify;
  install(name: string, method: Function): VerifyConstructor
  all(...parms: any[]): VerifyConstructor
  hook(name: string, method: Function): VerifyConstructor
}

export const Verify: VerifyConstructor;
