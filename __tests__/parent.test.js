import fetch from 'node-fetch';

describe('test sample', () => {
	test('get all parents', async () => {
		const requestBody = {
			query: `
			query {
				parents {
					_id,
					name,
					lastName
				}
			}`,
		};

		const res = await fetch('http://localhost:5000/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await res.json();

		expect(result.data.parents).toBeDefined();
		expect(result.data).toHaveProperty('parents');
	});
});
