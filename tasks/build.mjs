import { $, fs } from 'zx';

await $`tsc -p tsconfig.build.json`;

await fs.emptyDir('dist/');

await babel(
	'build/',
	'dist/import/',
	{
		configFile: './configs/babel-import.json',
		outputExtension: '.mjs',
		sourceMaps: true,
	},
);

await babel(
	'build/',
	'dist/require/',
	{
		configFile: './configs/babel-require.json',
		outputExtension: '.cjs',
		sourceMaps: true,
	},
);

await fs.copy('build/', 'dist/types/', {
	recursive: true,
	async filter(src) {
		const stats = await fs.lstat(src);

		return stats.isDirectory() || stats.isFile() && src.endsWith('.d.ts');
	},
});

async function babel(
	sourceFolder,
	outputFolder,
	{
		configFile,
		outputExtension,
		sourceMaps,
	} = {},
) {
	await $`babel ${sourceFolder} ${arg('--out-dir', outputFolder)} ${arg('--config-file', configFile)} ${arg('--out-file-extension', outputExtension)} ${flag(sourceMaps, '--source-maps')}`;
}

function arg(name, value) {
	return value != null ? [name, value] : undefined;
}

function flag(value, nameTrue, nameFalse) {
	return value != null ? value ? [nameTrue] : nameFalse != null ? [nameFalse] : undefined : undefined;
}
