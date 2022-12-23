export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')];

export const server_loads = [];

export const dictionary = {
	"/": [2],
	"/development": [3],
	"/examples/basic_usage_one_way_binding": [4],
	"/examples/basic_usage_two_way_binding": [5],
	"/examples/custom_dynamic_styling": [6],
	"/examples/custom_json_parser": [7],
	"/examples/custom_menu_buttons": [8],
	"/examples/custom_theme_color": [9],
	"/examples/custom_validation": [10],
	"/examples/custom_value_renderer": [11],
	"/examples/json_schema_validation": [12],
	"/examples/switch_themes": [13],
	"/examples/use_methods": [14]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};