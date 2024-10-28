export const parseDias = (d) => {
    let meses = Math.floor(d / 30);
    let dias = Math.ceil(d - meses * 30);
    let anos = Math.floor(meses / 12);
    meses = meses - anos * 12;

    if (d < 0) return { anos: 0, meses: 0, dias: 0 };
    return { anos, meses, dias };
};

