<script lang="ts">
	export let form;

	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
</script>

<h1>Let a computer guess your age, gender, and nationality.</h1>
<p>Input your name to start.</p>

<form method="POST" action="?/guess">
	<label>
		Your name
		<input type="text" name="guess-name" id="guess-name" />
	</label>
	<button>Guess</button>
</form>

<p class="data-sources">
	Data is from <a href="https://genderize.io/">genderize.io</a>,
	<a href="https://nationalize.io/">nationalize.io</a>, and
	<a href="https://agify.io/">agify.io</a>.
</p>

{#if form?.success && form.result}
	<div class="result">
		<p>The computer thinks you are {form.result.age} years old.</p>
		<p>
			It is {(form.result.genderProbability * 100).toFixed(0)}% confident that your gender is {form
				.result.gender}.
		</p>
		<p style="margin-bottom: 0;">
			The computer has also guessed five possible nationalities for you based on your name:
		</p>
		<ul style="margin-top: 0;">
			{#each form.result.potentialNationalities as { country_id, probability }}
				<li>{regionNames.of(country_id)} ({(probability * 100).toFixed(1)}% probable)</li>
			{/each}
		</ul>
	</div>
{/if}

{#if form?.success === false}
	<p>Something went wrong. Try another name.</p>
{/if}

<style>
	.result {
		border: 1px solid black;
		margin: 20px 0;
		padding: 10px 20px;
	}

	:global(body) {
		max-width: 600px;
		margin: 0 auto;
	}

	.data-sources {
		font-size: 13px;
		font-style: italic;
		opacity: 0.7;
	}
</style>
