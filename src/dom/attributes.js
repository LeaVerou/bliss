// Mass set attributes
export default function (o) {
	for (let attribute in o) {
		this.setAttribute(attribute, o[attribute]);
	}
}
