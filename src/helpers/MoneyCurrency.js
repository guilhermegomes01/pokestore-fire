const MoneyCurrency = (value) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
};

export { MoneyCurrency }