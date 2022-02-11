# 创建表

```sql
CREATE TABLE IF NOT EXISTS "t_notes" (
  "id" INTEGER NOT NULL UNIQUE,
  "question" TEXT NOT NULL,
  "answer" TEXT,
  "type" TEXT,
  PRIMARY KEY("id" AUTOINCREMENT)
);
```

# 复制表

```sql
INSERT INTO t_notes (question) SELECT content FROM NOTES;
```

# 删除表

```sql
DROP TABLE NOTES;
```

# 重命名表

```sql
ALTER TABLE t1_backup RENAME TO t1;
```

# 导出

```sh
# 导出 csv
sqlite3  -csv -header local.db  "select * from NOTES" > notes.csv
```
