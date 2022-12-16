from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    UpdateAPIView, DestroyAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from gym_plan.models.GymPlan import GymPlan
from gym_plan.serializers import PlanSerializer


class CreatePlanView(CreateAPIView):
    serializer_class = PlanSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_create(self, serializer):
        serializer.save()


class UpdatePlanView(UpdateAPIView, RetrieveAPIView, DestroyAPIView):
    queryset = GymPlan.objects.all()
    serializer_class = PlanSerializer

    def get_object(self):
        name = self.kwargs.get("name")
        plan = get_object_or_404(GymPlan, name=name)
        return plan

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, serializer):
        serializer.delete()

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        else:
            return [IsAuthenticated(), IsAdminUser()]


class AllPlanView(ListAPIView):
    queryset = GymPlan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [AllowAny]



