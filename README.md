# learn-quant-with-codex

一个课程型 Web 项目：用 Codex 学习美股量化交易基础。

这个项目不是实盘交易系统，不连接券商 API，不提供投资建议，也不承诺任何收益。所有策略、回测和图表都用于教学、编程练习和研究方法入门。

## 项目组成

- `web/`：Next.js + TypeScript + MDX 风格内容数据的交互式课程站。
- `python/`：使用 uv 管理的 Python 量化学习项目，包含数据处理、指标、策略、回测、实验和测试。
- `docs/`：需求文档和课程设计文档。

## 本地运行

前端：

```bash
cd web
npm install
npm run dev
```

Python：

```bash
cd python
uv sync
uv run pytest
uv run python examples/run_buy_and_hold.py
uv run python examples/run_capstone_check.py
```

## 学习路径

课程采用“边学边建”的结构：

1. 理解美股日线数据和数据质量。
2. 从价格计算收益、净值和风险指标。
3. 区分 signal、position、交易成本和回测收益。
4. 实现 buy and hold、双均线、动量和均值回归学习策略。
5. 比较单资产和多资产组合。
6. 做参数扫描、样本内 / 样本外验证和回测偏差检查。
7. 完成一份带代码、图表、测试和风险声明的学习型研究报告。

详细课程蓝图见 [docs/course-design.md](docs/course-design.md)。

最终报告要求见前端 `/capstone` 页面和第 9.4 课。

## 验证

```bash
cd python
uv run pytest
```

```bash
cd web
npm run lint
npm run build
```

## 风险声明

历史数据和回测结果不能代表未来收益。课程中的所有策略只是学习案例，不能直接用于真实资金交易。真实交易还涉及执行、流动性、滑点、税务、心理压力、系统故障和监管要求。
