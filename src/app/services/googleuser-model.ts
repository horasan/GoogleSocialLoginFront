export class GoogleUser {
    public sub: String;
	public name: String;
	public given_name: String;
	public family_name: String;
	public picture: String;
	public email: String;
	public email_verified: boolean;
	public locale: String;
 
    constructor(
        sub: String,
        name: String,
        given_name: String,
        family_name: String,
        picture: String,
        email: String,
        email_verified: boolean,
        locale: String
        ) {
            this.sub = sub;
            this.name = name;
            this.given_name =  given_name;
            this.family_name = family_name;
            this.picture = picture;
            this.email = email;
            this.email_verified = email_verified;
            this.locale = locale;
        }
        
}