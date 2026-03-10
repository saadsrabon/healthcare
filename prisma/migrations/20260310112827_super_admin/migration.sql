-- CreateTable
CREATE TABLE "superadmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "superadmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superadmin_email_key" ON "superadmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "superadmin_userId_key" ON "superadmin"("userId");

-- CreateIndex
CREATE INDEX "idx_suadmin_email" ON "superadmin"("email");

-- CreateIndex
CREATE INDEX "idx_suadmin_isDeleted" ON "superadmin"("isDeleted");

-- AddForeignKey
ALTER TABLE "superadmin" ADD CONSTRAINT "superadmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
