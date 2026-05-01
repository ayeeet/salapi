module.exports = [
"[project]/src/lib/module-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInvestmentEntry",
    ()=>createInvestmentEntry,
    "createSavingsEntry",
    ()=>createSavingsEntry,
    "deleteInvestmentEntry",
    ()=>deleteInvestmentEntry,
    "deleteSavingsEntry",
    ()=>deleteSavingsEntry,
    "listInvestments",
    ()=>listInvestments,
    "listSavings",
    ()=>listSavings,
    "updateInvestmentEntry",
    ()=>updateInvestmentEntry,
    "updateSavingsEntry",
    ()=>updateSavingsEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
;
async function listSavings(userId) {
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].savings.findMany({
            where: {
                userId
            },
            orderBy: {
                date: "desc"
            }
        });
    } catch (error) {
        console.error("Error fetching savings:", error);
        return [];
    }
}
async function createSavingsEntry(input) {
    const id = crypto.randomUUID();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].savings.create({
        data: {
            id,
            amount: input.amount,
            date: new Date(input.date),
            note: input.note?.trim() || null,
            userId: input.userId
        }
    });
    return id;
}
async function updateSavingsEntry(id, userId, payload) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].savings.updateMany({
        where: {
            id,
            userId
        },
        data: {
            amount: payload.amount,
            date: new Date(payload.date),
            note: payload.note?.trim() || null
        }
    });
}
async function deleteSavingsEntry(id, userId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].savings.deleteMany({
        where: {
            id,
            userId
        }
    });
}
async function listInvestments(userId) {
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].investment.findMany({
            where: {
                userId
            },
            orderBy: {
                date: "desc"
            }
        });
    } catch (error) {
        console.error("Error fetching investments:", error);
        return [];
    }
}
async function createInvestmentEntry(input) {
    const id = crypto.randomUUID();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].investment.create({
        data: {
            id,
            type: input.type,
            amount: input.amount,
            date: new Date(input.date),
            note: input.note?.trim() || null,
            userId: input.userId
        }
    });
    return id;
}
async function updateInvestmentEntry(id, userId, payload) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].investment.updateMany({
        where: {
            id,
            userId
        },
        data: {
            type: payload.type,
            amount: payload.amount,
            date: new Date(payload.date),
            note: payload.note?.trim() || null
        }
    });
}
async function deleteInvestmentEntry(id, userId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].investment.deleteMany({
        where: {
            id,
            userId
        }
    });
}
}),
"[project]/src/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004d892c347ebc4ff97f2fbc3a439b63d9366d31f7":{"name":"getDashboardData"},"00db92d2affd63dc3d490be869ef545cb2b34191e4":{"name":"logout"},"40038cb30a1b3c90c9ca75db4d710c2161307f17b1":{"name":"addInvestmentEntry"},"400428fb9680db6859e54fe014109730eef99b66c5":{"name":"addSavingsEntry"},"4007adbec54757691c8b01c7d876c2755adeb58356":{"name":"getSavingsTrackerData"},"4060b13916c0191ca7cbb909ae1f76723ea19f27bf":{"name":"deleteInvestmentEntry"},"40676733958e8dbc4438d03aadb027820f3e4e518b":{"name":"deleteSavingsEntry"},"407a293c5fbc946ebf56b9cdecc40590c9ac33e969":{"name":"addExpense"},"407a43b860aa18cc61312940714f0fd66fc624cdb7":{"name":"getExpenseTrackerData"},"40ae2ec9bd53e3b27a7e26c61e2285e2b01126941e":{"name":"deleteExpense"},"40de4f06561d7654e73c67971061b01fa62e9de409":{"name":"getInvestmentTrackerData"},"6019fd17cdb6ab4907b31043cb61b3fd66d07b0062":{"name":"updateSavingsEntry"},"607e24ea0f38b34a2d662b74e12745e6e69e8258b0":{"name":"updateExpense"},"60d7fb06f818e32c8d39b20e291ec61970e565232c":{"name":"updateInvestmentEntry"}},"src/app/actions.ts",""] */ __turbopack_context__.s([
    "addExpense",
    ()=>addExpense,
    "addInvestmentEntry",
    ()=>addInvestmentEntry,
    "addSavingsEntry",
    ()=>addSavingsEntry,
    "deleteExpense",
    ()=>deleteExpense,
    "deleteInvestmentEntry",
    ()=>deleteInvestmentEntry,
    "deleteSavingsEntry",
    ()=>deleteSavingsEntry,
    "getDashboardData",
    ()=>getDashboardData,
    "getExpenseTrackerData",
    ()=>getExpenseTrackerData,
    "getInvestmentTrackerData",
    ()=>getInvestmentTrackerData,
    "getSavingsTrackerData",
    ()=>getSavingsTrackerData,
    "logout",
    ()=>logout,
    "updateExpense",
    ()=>updateExpense,
    "updateInvestmentEntry",
    ()=>updateInvestmentEntry,
    "updateSavingsEntry",
    ()=>updateSavingsEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/module-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfDay.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfMonth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfWeek.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isWithinInterval.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfDay.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfMonth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfWeek.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function logout() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])({
        redirectTo: "/login"
    });
}
;
function resolveRange(range) {
    const now = new Date();
    if (range === "today") {
        return {
            start: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startOfDay"])(now),
            end: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["endOfDay"])(now)
        };
    }
    if (range === "week") {
        return {
            start: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startOfWeek"])(now, {
                weekStartsOn: 1
            }),
            end: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["endOfWeek"])(now, {
                weekStartsOn: 1
            })
        };
    }
    return {
        start: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startOfMonth"])(now),
        end: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["endOfMonth"])(now)
    };
}
async function addExpense(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const amount = parseFloat(formData.get("amount"));
    const category = formData.get("category");
    const date = formData.get("date");
    const note = formData.get("note");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].expense.create({
        data: {
            amount,
            category,
            date: new Date(date),
            note,
            userId: session.user.id
        }
    });
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: session.user.id
        }
    });
    if (user) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;
        if (lastLogin) lastLogin.setHours(0, 0, 0, 0);
        if (!lastLogin || lastLogin.getTime() !== today.getTime()) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
                where: {
                    id: user.id
                },
                data: {
                    streakCount: {
                        increment: 1
                    },
                    lastLoginDate: new Date()
                }
            });
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/expenses");
}
async function deleteExpense(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].expense.deleteMany({
        where: {
            id,
            userId: session.user.id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/expenses");
}
async function updateExpense(id, payload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].expense.updateMany({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            amount: payload.amount,
            category: payload.category,
            date: new Date(payload.date),
            note: payload.note?.trim() || null
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/expenses");
}
async function getDashboardData() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) return null;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: session.user.id
        },
        include: {
            expenses: {
                orderBy: {
                    date: "desc"
                }
            }
        }
    });
    if (!user) return null;
    const todayRange = resolveRange("today");
    const monthRange = resolveRange("month");
    const monthlyExpenses = user.expenses.filter((expense)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isWithinInterval"])(new Date(expense.date), {
            start: monthRange.start,
            end: monthRange.end
        }));
    const todaysExpenses = user.expenses.filter((expense)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isWithinInterval"])(new Date(expense.date), {
            start: todayRange.start,
            end: todayRange.end
        }));
    const totalSpent = monthlyExpenses.reduce((sum, exp)=>sum + exp.amount, 0);
    const todaySpent = todaysExpenses.reduce((sum, exp)=>sum + exp.amount, 0);
    const categoryTotals = monthlyExpenses.reduce((acc, exp)=>{
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});
    let highestCategory = "";
    let highestAmount = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)){
        if (amt > highestAmount) {
            highestAmount = amt;
            highestCategory = cat;
        }
    }
    let insight = "You are on track!";
    if (totalSpent > user.monthlyBudget && user.monthlyBudget > 0) {
        insight = "You have exceeded your monthly budget!";
    } else if (highestCategory) {
        insight = `You spent the most on ${highestCategory} (₱${highestAmount}).`;
    } else if (totalSpent === 0) {
        insight = "No expenses recorded yet for this month.";
    }
    const [allSavings, allInvestments] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listSavings"])(session.user.id),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listInvestments"])(session.user.id)
    ]);
    return {
        user: {
            email: user.email,
            monthlyBudget: user.monthlyBudget,
            streakCount: user.streakCount
        },
        expenses: user.expenses.slice(0, 5),
        summary: {
            totalSpent,
            todaySpent,
            totalSavings: allSavings.reduce((sum, entry)=>sum + Number(entry.amount), 0),
            totalInvestments: allInvestments.reduce((sum, entry)=>sum + Number(entry.amount), 0),
            percentageUsed: user.monthlyBudget > 0 ? Math.min(totalSpent / user.monthlyBudget * 100, 100) : 0,
            highestCategory,
            insight
        },
        categoryTotals
    };
}
async function getExpenseTrackerData(range) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) return null;
    const allExpenses = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].expense.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            date: "desc"
        }
    });
    const { start, end } = resolveRange(range);
    const filteredExpenses = allExpenses.filter((expense)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isWithinInterval"])(new Date(expense.date), {
            start,
            end
        }));
    const categoryTotals = filteredExpenses.reduce((acc, expense)=>{
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});
    return {
        range,
        expenses: filteredExpenses,
        total: filteredExpenses.reduce((sum, expense)=>sum + expense.amount, 0),
        categoryTotals
    };
}
async function addSavingsEntry(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const amount = Number(formData.get("amount"));
    const date = String(formData.get("date") || "");
    const note = String(formData.get("note") || "");
    if (!amount || !date) throw new Error("Invalid input");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSavingsEntry"])({
        userId: session.user.id,
        amount,
        date,
        note
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/savings");
}
async function updateSavingsEntry(id, payload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSavingsEntry"])(id, session.user.id, payload);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/savings");
}
async function deleteSavingsEntry(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSavingsEntry"])(id, session.user.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/savings");
}
async function getSavingsTrackerData(range) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) return null;
    const allEntries = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listSavings"])(session.user.id);
    const { start, end } = resolveRange(range);
    const filteredEntries = allEntries.filter((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isWithinInterval"])(new Date(entry.date), {
            start,
            end
        }));
    const now = new Date();
    const monthlyTotal = allEntries.filter((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isWithinInterval"])(new Date(entry.date), {
            start: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startOfMonth"])(now),
            end: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["endOfMonth"])(now)
        })).reduce((sum, entry)=>sum + Number(entry.amount), 0);
    return {
        range,
        entries: filteredEntries,
        total: allEntries.reduce((sum, entry)=>sum + Number(entry.amount), 0),
        monthlyTotal,
        rangeTotal: filteredEntries.reduce((sum, entry)=>sum + Number(entry.amount), 0)
    };
}
async function addInvestmentEntry(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const type = String(formData.get("type") || "");
    const amount = Number(formData.get("amount"));
    const date = String(formData.get("date") || "");
    const note = String(formData.get("note") || "");
    if (!type || !amount || !date) throw new Error("Invalid input");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createInvestmentEntry"])({
        userId: session.user.id,
        type,
        amount,
        date,
        note
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/investments");
}
async function updateInvestmentEntry(id, payload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateInvestmentEntry"])(id, session.user.id, payload);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/investments");
}
async function deleteInvestmentEntry(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteInvestmentEntry"])(id, session.user.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/modules/investments");
}
async function getInvestmentTrackerData(range) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id) return null;
    const allEntries = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$module$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listInvestments"])(session.user.id);
    const { start, end } = resolveRange(range);
    const filteredEntries = allEntries.filter((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isWithinInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isWithinInterval"])(new Date(entry.date), {
            start,
            end
        }));
    const breakdownByType = filteredEntries.reduce((acc, entry)=>{
        const key = entry.type.toLowerCase();
        acc[key] = (acc[key] || 0) + Number(entry.amount);
        return acc;
    }, {});
    return {
        range,
        entries: filteredEntries,
        total: allEntries.reduce((sum, entry)=>sum + Number(entry.amount), 0),
        rangeTotal: filteredEntries.reduce((sum, entry)=>sum + Number(entry.amount), 0),
        breakdownByType
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    logout,
    addExpense,
    deleteExpense,
    updateExpense,
    getDashboardData,
    getExpenseTrackerData,
    addSavingsEntry,
    updateSavingsEntry,
    deleteSavingsEntry,
    getSavingsTrackerData,
    addInvestmentEntry,
    updateInvestmentEntry,
    deleteInvestmentEntry,
    getInvestmentTrackerData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00db92d2affd63dc3d490be869ef545cb2b34191e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addExpense, "407a293c5fbc946ebf56b9cdecc40590c9ac33e969", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteExpense, "40ae2ec9bd53e3b27a7e26c61e2285e2b01126941e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateExpense, "607e24ea0f38b34a2d662b74e12745e6e69e8258b0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDashboardData, "004d892c347ebc4ff97f2fbc3a439b63d9366d31f7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getExpenseTrackerData, "407a43b860aa18cc61312940714f0fd66fc624cdb7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addSavingsEntry, "400428fb9680db6859e54fe014109730eef99b66c5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSavingsEntry, "6019fd17cdb6ab4907b31043cb61b3fd66d07b0062", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSavingsEntry, "40676733958e8dbc4438d03aadb027820f3e4e518b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSavingsTrackerData, "4007adbec54757691c8b01c7d876c2755adeb58356", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addInvestmentEntry, "40038cb30a1b3c90c9ca75db4d710c2161307f17b1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateInvestmentEntry, "60d7fb06f818e32c8d39b20e291ec61970e565232c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteInvestmentEntry, "4060b13916c0191ca7cbb909ae1f76723ea19f27bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInvestmentTrackerData, "40de4f06561d7654e73c67971061b01fa62e9de409", null);
}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "004d892c347ebc4ff97f2fbc3a439b63d9366d31f7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDashboardData"],
    "00db92d2affd63dc3d490be869ef545cb2b34191e4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "40038cb30a1b3c90c9ca75db4d710c2161307f17b1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addInvestmentEntry"],
    "400428fb9680db6859e54fe014109730eef99b66c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addSavingsEntry"],
    "4007adbec54757691c8b01c7d876c2755adeb58356",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSavingsTrackerData"],
    "4060b13916c0191ca7cbb909ae1f76723ea19f27bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteInvestmentEntry"],
    "40676733958e8dbc4438d03aadb027820f3e4e518b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSavingsEntry"],
    "407a293c5fbc946ebf56b9cdecc40590c9ac33e969",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addExpense"],
    "407a43b860aa18cc61312940714f0fd66fc624cdb7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getExpenseTrackerData"],
    "40ae2ec9bd53e3b27a7e26c61e2285e2b01126941e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteExpense"],
    "40de4f06561d7654e73c67971061b01fa62e9de409",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInvestmentTrackerData"],
    "6019fd17cdb6ab4907b31043cb61b3fd66d07b0062",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSavingsEntry"],
    "607e24ea0f38b34a2d662b74e12745e6e69e8258b0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateExpense"],
    "60d7fb06f818e32c8d39b20e291ec61970e565232c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateInvestmentEntry"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_0hnrst0._.js.map