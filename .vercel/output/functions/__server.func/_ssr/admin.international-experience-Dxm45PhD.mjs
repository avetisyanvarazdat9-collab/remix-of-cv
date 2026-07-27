import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.international-experience-Dxm45PhD.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "International Experience",
	description: "Trainings, workshops, conferences, and academic exchanges. Shown on the About page (Professional Development), homepage World Map, and Timeline. Include latitude/longitude to place a pin on the map.",
	table: "international_experience",
	orderBy: {
		column: "event_date",
		ascending: false
	},
	displayColumns: [
		"title",
		"organization",
		"location",
		"category",
		"event_date"
	],
	fields: [
		{
			name: "title",
			label: "Title",
			type: "i18n",
			required: true
		},
		{
			name: "organization",
			label: "Organization / University",
			type: "text"
		},
		{
			name: "location",
			label: "Location (City, Country)",
			type: "text",
			placeholder: "Berlin, Germany"
		},
		{
			name: "country_code",
			label: "Country code (ISO2)",
			type: "text",
			placeholder: "DE"
		},
		{
			name: "lat",
			label: "Latitude",
			type: "number",
			placeholder: "52.52"
		},
		{
			name: "lng",
			label: "Longitude",
			type: "number",
			placeholder: "13.405"
		},
		{
			name: "category",
			label: "Category",
			type: "text",
			placeholder: "Training / Workshop / Conference / Lecture / Exchange"
		},
		{
			name: "event_date",
			label: "Event date",
			type: "date"
		},
		{
			name: "description",
			label: "Description",
			type: "i18n-textarea"
		},
		{
			name: "url",
			label: "URL",
			type: "url"
		},
		{
			name: "display_order",
			label: "Display order",
			type: "number"
		},
		{
			name: "is_visible",
			label: "Visible",
			type: "boolean"
		}
	]
});
//#endregion
export { SplitComponent as component };
