export default class BtnAttribute {
    public static disabled(elementId: string, attributeValue: string): void {
        let button = document.getElementById(elementId);
        button?.setAttribute('disabled', attributeValue);
    }
}