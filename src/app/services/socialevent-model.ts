export class SocialEventItem {
	public eventNo: number;
    public createdDate: String;
	public calledURL: String;
	public description: String;

    constructor(
        eventNo: number,
        createdDate: String,
        calledURL: String,
        description: String
        ) {
            this.eventNo = eventNo;
            this.createdDate = createdDate;
            this.calledURL = calledURL;
            this.description = description;
        }
}