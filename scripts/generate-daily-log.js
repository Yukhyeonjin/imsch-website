/**
 * Daily Work Log Generator
 * Usage: node generate-daily-log.js [path-to-task.md]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function getGitLog() {
    try {
        // Get commits from 00:00 today
        const today = getTodayDate();
        const cmd = `git log --since="${today} 00:00:00" --pretty=format:"- %s"`;
        const output = execSync(cmd, { encoding: 'utf8' });
        return output ? output : "No commits found for today.";
    } catch (e) {
        return "Error reading git log: " + e.message;
    }
}

function getTaskProgress(taskMdPath) {
    if (!taskMdPath || !fs.existsSync(taskMdPath)) {
        return "Task file not found or not provided.";
    }

    try {
        const content = fs.readFileSync(taskMdPath, 'utf8');
        const lines = content.split('\n');
        const tasks = lines
            .filter(line => line.trim().match(/^-\s*\[([xX/ ])\]/)) // Match [ ], [x], [/]
            .map(line => {
                const match = line.match(/^\s*-\s*\[([xX/ ])\]\s*(.*)/); // Allow leading whitespace
                if (!match) return null; // Should not happen due to filter, but safe
                const statusChar = match[1].toLowerCase();
                const text = match[2].replace(/<!--.*?-->/, '').trim(); // Remove comments

                let status = 'Todo';
                if (statusChar === 'x') status = 'Done';
                if (statusChar === '/') status = 'In Progress';

                return { status, text };
            })
            .filter(t => t); // Filter out any nulls

        if (tasks.length === 0) return "No tasks found in task.md.";

        // Format as Markdown list
        const summary = tasks.map(t => {
            const icon = t.status === 'Done' ? '✅' : (t.status === 'In Progress' ? '🏃' : '⬜');
            return `- ${icon} ${t.text}`;
        }).join('\n');

        return summary;
    } catch (e) {
        return "Error reading task.md: " + e.message;
    }
}

function main() {
    // 1. Determine task.md path: Argument -> Current Dir -> Error
    let taskMdPath = process.argv[2];
    if (!taskMdPath) {
        const defaultPath = path.join(process.cwd(), 'task.md');
        if (fs.existsSync(defaultPath)) {
            taskMdPath = defaultPath;
        } else {
            // Try to find task.md in artifacts/brain directory if possible (Optional enhancement, skipped for now to keep it simple local)
        }
    }

    const today = getTodayDate();
    const gitLog = getGitLog();

    // 2. Get Task Progress (Graceful fallback if file missing)
    let taskProgress = "Task file not found.";
    if (taskMdPath && fs.existsSync(taskMdPath)) {
        taskProgress = getTaskProgress(taskMdPath);
    } else if (!taskMdPath) {
        taskProgress = "No `task.md` found in current directory. Please provide path or create one.";
    } else {
        taskProgress = `Task file not found at: ${taskMdPath}`;
    }

    const blogPost = `
# 📅 ${today} 개발 작업 일지

## 📝 오늘 진행한 작업 (Tasks)
${taskProgress}

## 💻 상세 커밋 내역 (Git Log)
${gitLog}

---
*이 로그는 Daily Work Log Generator에 의해 자동 생성되었습니다.*
`;

    console.log(blogPost);
}

main();
