const { subcourses, courses } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const insertsubCourses = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const courseData = await courses.findOne({
      where: {
        course_id: rest.courseId,
        Institute: rest.InstituteId,
        isDelete: false,
      },
    });
    console.log("courseData", courseData);
    const subcoursesData = await subcourses.findOne({
      where: {
        courseId: rest.courseId,
        InstituteId: rest.InstituteId,
        subcourses: rest.subcourses,
        isDelete: false,
      },
    });
    console.log("subcoursesData", subcoursesData);
    if (courseData == null) {
      res
        .status(400)
        .json(`create coures then create subCourses ${rest.course}`);
    } else if (subcoursesData != null) {
      res.status(401).json({ msg: `subcourses allready persent` });
    } else {
      const insert = await subcourses.create(req.body);
      res
        .status(200)
        .json({ msg: "create courses successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "course is not insert data", err });
  }
};

const getsubCoursesAll = async (req, res) => {
  try {
    const getData = await db.sequelize.query(
      `select s.subcourses_id ,s.InstituteId ,s.courseId ,s.subcourses ,s.startTime ,s.endTime  
      from subcourses s 
      where s.isDelete =false `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", getData);
    res
      .status(200)
      .json({ msg: "get sub courses successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully", err });
  }
};

const getsubCourses = async (req, res) => {
  try {
    const getData = await db.sequelize.query(
      `select s.subcourses_id,s.subcourses ,s.courseId ,c.course,s.InstituteId,i.InstituteName,
        s.startTime ,s.endTime 
        from subcourses s 
        inner join courses c on c.course_id =s.courseId 
        inner join institutes i on i.institute_id =s.InstituteId  
        where s.InstituteId=${req.query.InstituteId} && s.isDelete=false `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", getData);
    res
      .status(200)
      .json({ msg: "get sub courses successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully", err });
  }
};

const getsubCoursesById = async (req, res) => {
  const subcourses_id = req.query.subcourses_id;
  try {
    const getData = await db.sequelize.query(
      `select s.subcourses_id,s.subcourses ,s.courseId ,c.course,s.InstituteId,i.InstituteName,
        s.startTime ,s.endTime 
        from subcourses s 
        inner join courses c on c.course_id =s.courseId 
        inner join institutes i on i.institute_id =s.InstituteId 
        where s.subcourses_id=${subcourses_id} && s.isDelete=false  `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", getData);
    res.status(200).json({
      msg: `get sub courses By Id successfully ${subcourses_id}`,
      data: getData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const updatesubCoursesById = async (req, res) => {
  const { ...rest } = req.body;
  const subcourses_id = req.query.subcourses_id;

  try {
    const courseData = await courses.findOne({
      where: {
        course_id: rest.course,
        isDelete: false,
      },
    });

    if (courseData == null) {
      res
        .status(400)
        .json(`create coures then update subCourses ${rest.course}`);
    } else if (courseData != null) {
      const instituteName = await subcourses.findOne({
        where: {
          InstituteId: courseData.Institute,
          courseId: rest.course,
          subcourses: rest.subcourses,
        },
      });
      if (instituteName == null) {
        const updateData = await subcourses.update(rest, {
          where: {
            isDelete: false,
            subcourses_id: subcourses_id,
          },
        });
        res.status(200).json({
          msg: `update courses successfully ${subcourses_id}`,
          data: updateData,
        });
      } else if (instituteName != null) {
        const data = {
          startDate: rest.startDate,
          endDate: rest.endDate,
        };
        const updateData = await subcourses.update(data, {
          where: {
            isDelete: false,
            subcourses_id: subcourses_id,
          },
        });
        res.status(200).json({
          msg: `update courses successfully ${subcourses_id}`,
          data: updateData,
        });
      } else {
        res.status(401).json({ msg: `all ready persent ` });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const deletesubCoursesById = async (req, res) => {
  const subcourses_id = req.query.subcourses_id;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await subcourses.update(data, {
      where: {
        isDelete: false,
        subcourses_id: subcourses_id,
      },
    });
    res.status(200).json({
      msg: `update courses successfully ${subcourses_id}`,
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const getToken = async (req, res) => {
  const { subcourses_id, InstituteId } = req.query;
  try {
    const token = await subcourses.findOne({
      where: {
        subcourses_id: subcourses_id,
        InstituteId: InstituteId,
      },
    });
    console.log("token", token.token);
    res
      .status(200)
      .json({ msg: `get institute token successfull `, data: token.token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `token not found in institute `, err });
  }
};

module.exports = {
  insertsubCourses,
  getsubCoursesAll,
  getsubCourses,
  getsubCoursesById,
  updatesubCoursesById,
  deletesubCoursesById,
  getToken,
};
