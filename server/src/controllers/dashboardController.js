const {
  getTeacherDashboard,
  getAccuracyOverTime,
  getMostCommonErrors,
  getExercisesByDifficulty,
  getTeacherStudents,
  getTeacherStudentDashboard,
  getTeacherStudentHistory,
  getTeacherStudentAccuracy,
  getTeacherStudentErrors,
} = require("../services/dashboardService");

async function getDashboard(req, res) {
  try {
    const teacherId = req.user.userId;
    const dashboard = await getTeacherDashboard(teacherId);

    res.json(dashboard);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Dashboard error",
    });
  }
}

async function getAccuracyChart(req, res) {
  try {
    const teacherId = req.user.userId;
    const data = await getAccuracyOverTime(teacherId);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Accuracy chart error",
    });
  }
}

async function getErrorsChart(req, res) {
  try {
    const teacherId = req.user.userId;
    const data = await getMostCommonErrors(teacherId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Errors chart error",
    });
  }
}

async function getDifficultyChart(req, res) {
  try {
    const teacherId = req.user.userId;
    const data = await getExercisesByDifficulty(teacherId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Difficulty chart error",
    });
  }
}

async function getTeacherStudentsController(req, res) {
  try {
    const teacherId = req.user.userId;

    const students = await getTeacherStudents(teacherId);

    res.json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Students error",
    });
  }
}

async function getTeacherStudentDashboardController(req, res) {
  try {
    const teacherId = req.user.userId;

    const studentId = Number(req.params.studentId);

    const dashboard = await getTeacherStudentDashboard(teacherId, studentId);

    if (!dashboard) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (dashboard === "FORBIDDEN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(dashboard);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Student dashboard error",
    });
  }
}

async function getTeacherStudentHistoryController(req, res) {
  try {
    const teacherId = req.user.userId;

    const studentId = Number(req.params.studentId);

    const history = await getTeacherStudentHistory(teacherId, studentId);

    if (history === "FORBIDDEN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Student history error",
    });
  }
}

async function getTeacherStudentAccuracyController(req, res) {
  try {
    const teacherId = req.user.userId;

    const studentId = Number(req.params.id);

    const data = await getTeacherStudentAccuracy(teacherId, studentId);

    if (data === "FORBIDDEN") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Student accuracy error",
    });
  }
}

async function getTeacherStudentErrorsController(req, res) {
  try {
    const teacherId = req.user.userId;

    const studentId = Number(req.params.id);

    const data = await getTeacherStudentErrors(teacherId, studentId);

    if (data === "FORBIDDEN") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Student errors chart error",
    });
  }
}

module.exports = {
  getDashboard,
  getAccuracyChart,
  getErrorsChart,
  getDifficultyChart,
  getTeacherStudentsController,
  getTeacherStudentDashboardController,
  getTeacherStudentHistoryController,
  getTeacherStudentAccuracyController,
  getTeacherStudentErrorsController,
};
