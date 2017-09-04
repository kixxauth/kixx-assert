module.exports = {
	"extends": "eslint:recommended",
	"rules": {
		"strict": [
			"error"
		],
		"block-scoped-var": [
			"error"
		],
		"one-var": [
			"error",
			"never"
		],
		"no-caller": [
			"error"
		],
		"semi": [
			"error",
			"always"
		],
		"curly": [
			"error",
			"multi-line"
		],
		"comma-dangle": [
			"error",
			"never"
		],
		"eqeqeq": [
			"error",
			"always"
		],
		"wrap-iife": [
			"error"
		],
		"no-shadow-restricted-names": [
			"error"
		],
		"no-catch-shadow": [
			"error"
		],
		"no-undefined": [
			"error"
		],
		"no-labels": [
			"error"
		],
		"for-direction": [
			"error"
		],
		"no-extra-parens": [
			"error"
		],
		"no-prototype-builtins": [
			"error"
		],
		"no-template-curly-in-string": [
			"error"
		],
		"array-callback-return": [
			"error"
		],
		"no-floating-decimal": [
			"error"
		],
		"radix": [
			"error"
		],
		"no-multi-spaces": [
			"error"
		],
		"indent": [
			"error",
			"tab",
			{"SwitchCase": 1}
		],
		"quotes": [
			"error",
			"single"
		],
		"no-warning-comments": [
			"warn",
			{location: "anywhere"}
		]
	}
};