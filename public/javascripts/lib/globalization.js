define([
    "exports",
	"lib/globalize",
	// CLDR content.
	"json!lib/cldr-data/main/tr/ca-gregorian.json",
	"json!lib/cldr-data/main/tr/currencies.json",
	"json!lib/cldr-data/main/tr/dateFields.json",
	"json!lib/cldr-data/main/tr/numbers.json",
	"json!lib/cldr-data/supplemental/currencyData.json",
	"json!lib/cldr-data/supplemental/likelySubtags.json",
	"json!lib/cldr-data/supplemental/plurals.json",
	"json!lib/cldr-data/supplemental/timeData.json",
	"json!lib/cldr-data/supplemental/weekData.json",

	// Extend Globalize with Date and Number modules.
	"lib/globalize/currency",
	"lib/globalize/date",
	"lib/globalize/message",
	"lib/globalize/number",
	"lib/globalize/plural",
	"lib/globalize/relative-time"
], function (exports, Globalize, enGregorian, enCurrencies, enDateFields, enNumbers, currencyData, likelySubtags,
	pluralsData, timeData, weekData) {

    var en, like, number;

    // At this point, we have Globalize loaded. But, before we can use it, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
    Globalize.load(
		currencyData,
		enCurrencies,
		enDateFields,
		enGregorian,
		enNumbers,
		likelySubtags,
		pluralsData,
		timeData,
		weekData
	);
    
    Globalize.locale('tr');

    exports = Globalize;

    return exports;
});