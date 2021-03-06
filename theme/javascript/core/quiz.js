define([
    "jQuery",
    "utils/execute",
    "utils/analytic",
    "core/state"
], function($, execute, analytic, state){
    // Bind an exercise
    var prepareExercise = function($exercise) {

        $exercise.find(".quiz-answers input").click(function(e) {
            e.preventDefault();
        });

        // Submit: test code
        $exercise.find(".action-submit").click(function(e) {
            e.preventDefault();
            analytic.track("exercise.submit");
            $exercise.find("tr.alert-danger,li.alert-danger").removeClass("alert-danger");
            $exercise.find(".alert-success,.alert-danger").addClass("hidden");

            $exercise.find(".quiz").each(function(q) {
                var result = true;
                var $answers = $exercise.find(".quiz-answers").slice(q).find("input[type=radio], input[type=checkbox]");
                $(this).find("input[type=radio],input[type=checkbox]").each(function(i) {
                    var correct = $(this).is(":checked") === $answers.slice(i).first().is(":checked");
                    result = result && correct;
                    if (!correct) {
                        $(this).closest("tr, li").addClass("alert-danger");
                    }
                });
                $(this).find(result ? "div.alert-success" : "div.alert-danger").toggleClass("hidden");
            });

        });

        $exercise.find(".action-solution").click(function(e) {
            $exercise.find(".quiz, .quiz-answers").toggleClass("hidden");
        });
    };

    // Prepare all exercise
    var init = function() {
        state.$book.find("section.quiz").each(function() {
            prepareExercise($(this));
        });
    };

    return {
        init: init,
        prepare: prepareExercise
    };
});
