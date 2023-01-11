import fetch from 'node-fetch';

describe('test sample', () => {
	test('get all groups', async () => {
		const requestBody = {
			query: `
			query {
				groups {
					_id,
					name,
                    coaches {
                        _id
                    }
                    teamMom {
                        _id
                    }
                    games {
                        _id
                    }
                    ageAllowance
                    wins
                    loses
                    draws
                    ranking
                    isInPlayoff
                    isArchive
                    createdAt
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

		expect(result.data.groups).toBeDefined();
		expect(result.data).toHaveProperty('groups');
	});
});
