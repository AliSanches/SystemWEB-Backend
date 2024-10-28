export class ListConfigs {
	constructor(readonly repository) {}

	execute = async () => {
		let query = await this.repository.get();

		return query;
	};
}
