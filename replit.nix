{ pkgs }: {
	deps = [
		pkgs.ipfs
  pkgs.yarn
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}