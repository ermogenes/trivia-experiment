<template>
  <header>
    <h1>Trivia XP</h1>
    <span>Round #{{ this.round }}</span>
  </header>

  <main>
    <aside>
      <Scoreboard
        :player="player"
        :points="points"
        :lifes="lifes"
        :helps="helps"
        :nextHelp="nextHelp"
        :jumps="jumps"
        :nextJump="nextJump"
        :translations="translations"
        :nextTranslation="nextTranslation"
      />
      <HomeButton @homeClick="$emit('homeClick')" class="back" />
    </aside>
    <section>
      <Question
        v-if="this.lifes > 0"
        :translation="questionTranslated"
        :difficulty="difficulty"
        :category="category"
        :helpIcon="helpIcon"
        :helpGiven="helpGiven"
        :canUseHelp="helps > 0"
        :canUseJump="jumps > 0"
        :canUseTranslation="translations > 0 && !translationUsedThisRound"
        @answer="handleAnswer"
        @help="handleHelp"
        @jump="handleJump"
        @translate="handleTranslate"
        >{{ question }}
      </Question>
      <div class="game-over" v-else>
        <h1>Game Over</h1>
        <span>🍬 {{ finalPoints }} points!</span>
      </div>
    </section>
  </main>
</template>

<script>
import he from 'he';
import HomeButton from './HomeButton.vue';
import Scoreboard from './Scoreboard.vue';
import Question from './Question.vue';

const gameDefs = {
  initialLifes: 3,
  initialHelps: 1,
  initialJumps: 2,
  initialTranslations: 3,
  rightAnswersToGetHelp: 20,
  rightAnswersToGetJump: 10,
  rightAnswersToGetTranslation: 5,
  rightAnswersToGetLife: 25,
  notUsedHelpsPoint: 1,
  notUsedJumpPoint: 1,
  notUsedTranslationPoint: 1,
  lastEasyRound: 10,
  lastMediumRound: 20,
  pointsByHelps: 1,
  pointsByJumps: 1,
  pointsByTranslations: 1,
  helpCorrectness: 5 / 6,
};

export default {
  emits: ['homeClick', 'gameFinished'],
  props: ['player'],
  components: {
    HomeButton,
    Scoreboard,
    Question,
  },
  data() {
    return {
      round: 1,
      lifes: gameDefs.initialLifes,
      points: 0,
      finalPoints: 0,

      helpIcon: '',
      helpGiven: false,
      helps: gameDefs.initialHelps,
      toGetHelp: gameDefs.rightAnswersToGetHelp,
      helpsAccumulated: 0,
      totalHelpsUsed: 0,

      jumps: gameDefs.initialJumps,
      toGetJump: gameDefs.rightAnswersToGetJump,
      jumpsAccumulated: 0,
      totalJumpsUsed: 0,

      translations: gameDefs.initialTranslations,
      toGetTranslation: gameDefs.rightAnswersToGetTranslation,
      translationsAccumulated: 0,
      totalTranslationsUsed: 0,
      translationUsedThisRound: false,

      question: '',
      questionTranslated: '',
      correctAnswer: '',
      difficulty: 'easy',
      category: '',
    };
  },
  computed: {
    nextHelp() {
      return `${((this.helpsAccumulated / this.toGetHelp) * 100).toFixed(0)}%`;
    },
    nextJump() {
      return `${((this.jumpsAccumulated / this.toGetJump) * 100).toFixed(0)}%`;
    },
    nextTranslation() {
      return `${((this.translationsAccumulated / this.toGetTranslation) * 100).toFixed(0)}%`;
    },
  },
  mounted() {
    this.nextQuestion();
  },
  methods: {
    restartHelpButton() {
      this.helpIcon = '🙌🏼';
      this.helpGiven = false;
    },
    async nextQuestion() {
      this.restartHelpButton();

      this.question = 'loading...';
      this.questionTranslated = '';

      if (this.round <= gameDefs.lastEasyRound) {
        this.difficulty = 'easy';
      } else if (this.round <= gameDefs.lastMediumRound) {
        this.difficulty = 'medium';
      } else {
        this.difficulty = 'hard';
      }

      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&difficulty=${this.difficulty}&type=boolean`,
      );
      const data = await response.json();
      this.question = he.decode(data.results[0].question);
      this.questionTranslated = '';
      this.correctAnswer = data.results[0].correct_answer.toLowerCase();
      this.category = data.results[0].category;
      this.translationUsedThisRound = false;
    },
    async translate() {
      this.questionTranslated = 'traduzindo...';
      this.translationUsedThisRound = true;
      const response = await fetch('https://translate.argosopentech.com/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: this.question,
          source: 'en',
          target: 'pt',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      this.questionTranslated = data.translatedText;
    },
    handleAnswer(answer) {
      const correct = this.correctAnswer === String(answer);

      if (correct) {
        this.points += 1;
      } else {
        this.lifes -= 1;
      }

      if (this.lifes > 0) {
        this.round += 1;
        this.helpsAccumulated += 1;
        this.jumpsAccumulated += 1;
        this.translationsAccumulated += 1;

        this.updateAccumulated();

        this.nextQuestion();
      } else {
        this.calculateFinalPoints();
      }
    },
    generateHelp() {
      if (Math.random() <= gameDefs.helpCorrectness) {
        return this.correctAnswer === 'true' ? '👍🏼' : '👎🏼';
      }
      return this.correctAnswer === 'true' ? '👎🏼' : '👍🏼';
    },
    handleHelp() {
      this.helpIcon = this.generateHelp();
      this.helpGiven = true;

      this.helps -= 1;
      this.totalHelpsUsed += 1;
      this.updateAccumulated();
    },
    handleJump() {
      this.round += 1;
      this.helpsAccumulated += 1;
      this.jumpsAccumulated += 1;
      this.translationsAccumulated += 1;

      this.jumps -= 1;
      this.totalJumpsUsed += 1;

      this.updateAccumulated();

      this.nextQuestion();
    },
    async handleTranslate() {
      this.translate();

      this.translations -= 1;
      this.totalTranslationsUsed += 1;
      this.updateAccumulated();
    },
    updateAccumulated() {
      if (this.helpsAccumulated >= this.toGetHelp) {
        this.helps += 1;
        this.helpsAccumulated = 0;
      }

      if (this.jumpsAccumulated >= this.toGetJump) {
        this.jumps += 1;
        this.jumpsAccumulated = 0;
      }

      if (this.translationsAccumulated >= this.toGetTranslation) {
        this.translations += 1;
        this.translationsAccumulated = 0;
      }
    },
    calculateFinalPoints() {
      this.finalPoints = this.points;
      this.finalPoints += this.helps * gameDefs.pointsByHelps;
      this.finalPoints += this.jumps * gameDefs.pointsByJumps;
      this.finalPoints += this.translations * gameDefs.pointsByTranslations;
      this.$emit('gameFinished', {
        player: this.player,
        points: this.finalPoints,
        when: Date.now(),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    margin: 0;
    padding: 0;
  }

  h1 {
    flex: 1;
  }
}

main {
  width: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;

  aside {
    width: 7em;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
  }

  section {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .game-over {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
