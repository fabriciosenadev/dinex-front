export default class BtnAttribute {
    public static disabled(elementName: string, attributeValue: string): void {
        let button = document.getElementById(elementName);
        button?.setAttribute('disabled', attributeValue);
    }
}