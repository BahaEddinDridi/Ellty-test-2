  import { Router } from "express";
  import prisma from "../prisma.js";
  import { requireAuth, AuthRequest } from "../middleware/auth";
  import { compute } from "../utils/compute";

  const router = Router();

  router.get("/", async (req, res) => {
    const trees = await prisma.tree.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: { select: { id: true, username: true } },
        nodes: {
          orderBy: { createdAt: "asc" },
          include: { createdBy: { select: { id: true, username: true } } },
        },
      },
    });
    res.json(trees);
  });

  router.post("/", requireAuth, async (req: AuthRequest, res) => {
    const { startNumber } = req.body;
    if (typeof startNumber !== "number")
      return res.status(400).json({ error: "startNumber must be a number" });
    const tree = await prisma.tree.create({
      data: {
        startNumber,
        createdById: req.userId!,
      },
    });

    const rootNode = await prisma.node.create({
      data: {
        treeId: tree.id,
        parentId: null,
        operation: null,
        rightValue: null,
        result: startNumber,
        createdById: req.userId!,
      },
    });

    res.json({ tree, rootNode });
  });

  router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const tree = await prisma.tree.findUnique({
      where: { id },
      include: {
        nodes: {
          include: { createdBy: { select: { id: true, username: true } } },
          orderBy: { createdAt: "asc" },
        },
        createdBy: { select: { id: true, username: true } },
      },
    });
    if (!tree) return res.status(404).json({ error: "Tree not found" });
    res.json(tree);
  });

  router.post("/:id/operations", requireAuth, async (req: AuthRequest, res) => {
    const treeId = Number(req.params.id);
    const { parentId, operation, rightValue } = req.body;
    if (!["+", "-", "*", "/"].includes(operation))
      return res.status(400).json({ error: "invalid operation" });
    if (typeof rightValue !== "number")
      return res.status(400).json({ error: "rightValue must be a number" });

    const parentNode = await prisma.node.findUnique({ where: { id: parentId } });
    if (!parentNode)
      return res.status(400).json({ error: "parent node not found" });
    if (parentNode.treeId !== treeId)
      return res
        .status(400)
        .json({ error: "parent does not belong to this tree" });

    try {
      const newResult = compute(parentNode.result, operation, rightValue);
      const newNode = await prisma.node.create({
        data: {
          treeId,
          parentId,
          operation,
          rightValue,
          result: newResult,
          createdById: req.userId!,
        },
      });
      res.json({ node: newNode });
    } catch (err: any) {
      res.status(400).json({ error: err.message || "error computing" });
    }
  });

  export default router;
