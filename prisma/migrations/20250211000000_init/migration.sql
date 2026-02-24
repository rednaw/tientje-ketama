-- CreateTable
CREATE TABLE "Recording" (
    "id" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "fileSizeBytes" BIGINT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recording_uploadedAt_idx" ON "Recording"("uploadedAt");
