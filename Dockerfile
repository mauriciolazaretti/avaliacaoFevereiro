#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["AplicacaoBackend/AplicacaoBackend.csproj", "AplicacaoBackend/"]
COPY ["DataAccess/DataAccess.csproj", "DataAccess/"]
RUN dotnet restore "AplicacaoBackend/AplicacaoBackend.csproj"
COPY . .
WORKDIR "/src/AplicacaoBackend"
RUN dotnet build "AplicacaoBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AplicacaoBackend.csproj" -c Release -o /app/publish

FROM base AS final
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS="http://+:5000"
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
EXPOSE 5000
ENTRYPOINT ["dotnet", "AplicacaoBackend.dll","--environment=Development"]
