import fetch from 'node-fetch';

describe('test sample', () => {
	test('get all coaches', async () => {
		const requestBody = {
			query: `
			query {
				coaches {
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

		expect(result.data.coaches).toBeDefined();
		expect(result.data).toHaveProperty('coaches');
	});
});
