//על מנת לנהל שגיאות ניצור מחלקה חדשה שיורשת את מחלקת השגיאה המקורית רק שעכשיו ניתן להתייחס ולערוך
//את תכונותיה : מלל הודעה וקוד שגיאה
class ExpressError extends Error {
    constructor(message, statusCode){
        super();
        this.message=message;
        this.statusCode=statusCode;
    }
}
module.exports=ExpressError;