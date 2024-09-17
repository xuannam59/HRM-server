export const generateRandomNumber = (length: number): string => {
    const chars: string = "0123456789";

    let result: string = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length + 1));
    }

    return result;
}