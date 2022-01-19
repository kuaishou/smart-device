export const getCertificates = (code?:string) => {
    const config: { [key: string]: any } = {
        "01": "身份证",
        "02": "护照",
        "03": "军人证",
        "05": "台胞证",
        "06": "港澳返乡证",
        "99": "其他",
    }
    // debugger
    // console.log(code)
    // console.log(config[code])
    if(code){
        return config[code];
    }
    return config;
}