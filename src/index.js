import $ from "./$.js";
import $$ from "./$$.js";

import overload from "./overload.js";
import extend from "./extend.js";
import type from "./type.js";
import each  from "./each.js";
import ready from "./ready.js";
import value from "./value.js";
import Class from "./Class.js";
import live from "./live.js";
import lazy from "./lazy.js";

import * as dom from "./dom/index.js";
import * as async from "./async/index.js";
import * as events from "./events/index.js";

import Hooks from "./Hooks.js";
import add from "./add.js";

// Import params
Object.assign($, self.Bliss);

Object.assign($, {
	extend,
	overload,
	type,

	property: $.property || "_",

	$: $$,

	each,
	ready,
	Class,
	live,
	lazy,

	...dom,
	...events,
	...async,

	value,

	Hooks,
	hooks: new Hooks(),

	add
});

export default $;
export {$, $ as Bliss, $$};
