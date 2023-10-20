const Expense = require("../model/expense.js");

exports.getAllExpense = (req, res, next) => {
    Expense.findAll().then(result => {
        res.status(200).send({
            message: "successfully fetched all data",
            data: result
        })
    }).catch(err => {
        console.log(`${err} in getAllExpense`)
    })
}

exports.addExpense = (req, res, next) => {
    const { amt, desc, catogary } = req.body;

    const expense = { amt, desc, catogary }

    Expense.create(expense).then((data) => {
        return res.status(200).send({ message: "Expense added successfully", data: data });
    }).catch(err => {
        console.log(`${err} in addExpense`)
    })

}
exports.deleteExpense = (req, res, next) => {
    const { id } = req.params;

    Expense.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).send("Expense get deleted successfully");
    }).catch(err => {
        console.log(`${err} in deleteExpense`)
    });
}

exports.editExpense = (req, res, next) => {
    const { amt, desc, catogary } = req.body;
    const { id } = req.params;

    Expense.update({ amt, desc, catogary },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).send("Expense get updated successfully");
        }).catch(err => {
            console.log(`${err} in editExpense`)
        });
}