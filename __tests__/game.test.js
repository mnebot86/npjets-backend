import fetch from 'node-fetch';

describe('test sample', () => {
	test('get all games', async () => {
		const requestBody = {
			query: `
			query {
				games {
					_id,
					group {
                        _id
                    }
                    homeTeam
                    visitingTeam
                    date
                    time
                    homeScore
                    visitingScore
                    location
                    isPlayOffGame
                    isChampionship
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

		expect(result.data.games).toBeDefined();
		expect(result.data).toHaveProperty('games');
	});
});
