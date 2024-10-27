export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  export function validateCPF(cpf) {
    const cpfRegex = /^\d{11}$/;  // Simples validação de formato, pode ser substituída por uma mais robusta
    return cpfRegex.test(cpf);
  }
