export class StringUtils {
  public static justNumbers(numero: string): string {
    return numero.replace(/[^0-9]/g, '');
  }

  public static formatDate(dateString: any): any {
    let dateParts = dateString.split('/');
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
  }

  public static formatDateTime(dateTime: string): any {
    let dateTimeFomat = new Date(dateTime).toLocaleString();

    return dateTimeFomat;
  }
}
