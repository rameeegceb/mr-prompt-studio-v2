class ConfidenceCalculator {

  calculate(score: number) {

    if (score >= 150)
      return 100;

    if (score >= 120)
      return 95;

    if (score >= 90)
      return 90;

    if (score >= 70)
      return 80;

    if (score >= 50)
      return 70;

    return 50;

  }

}

export default new ConfidenceCalculator();