import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	guess: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('guess-name');

		const ageResult = fetch(`https://api.agify.io/?name=${name}`, { method: 'GET' })
			.then((res) => res.json())
			.then(({ age }) => age as number);

		const genderResult = fetch(`https://api.genderize.io/?name=${name}`, { method: 'GET' })
			.then((res) => res.json())
			.then(
				({ gender, probability }) =>
					({ gender, probability } as { gender: 'male' | 'female'; probability: number })
			);

		const nationalityResult = fetch(`https://api.nationalize.io/?name=${name}`, { method: 'GET' })
			.then((res) => res.json())
			.then(({ country }) => country as { country_id: string; probability: number }[]);

		const result = {
			age: await ageResult,
			gender: (await genderResult).gender,
			genderProbability: (await genderResult).probability,
			potentialNationalities: await nationalityResult
		};

		if (result.age === null) {
			return { success: false };
		}

		return { success: true, result };
	}
} satisfies Actions;
