class Kwork {
  constructor(private login: string, private password: string) {}

  getToken(): string {
    return 'Token';
  }
}

module.exports = Kwork;
